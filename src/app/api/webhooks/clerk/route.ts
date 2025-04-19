import { Webhook } from 'svix'
import { WebhookEvent } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db/prisma' // Import your Prisma client instance
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers from the Request object
  const svix_id = req.headers.get("svix-id");
  const svix_timestamp = req.headers.get("svix-timestamp");
  const svix_signature = req.headers.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    })
  }

  // Get the ID and type
  const eventData = evt.data as any; // Use `any` for now, refine types if possible
  const eventId = eventData.id;
  const eventType = evt.type;

  console.log(`Webhook with an ID of ${eventId || 'N/A'} and type of ${eventType}`)

  // Handle the event based on its type
  switch (eventType) {
    case 'user.created':
    case 'user.updated':
      const clerkId = eventData.id;
      const email = eventData.email_addresses?.[0]?.email_address;
      const firstName = eventData.first_name;
      const lastName = eventData.last_name;
      const imageUrl = eventData.image_url;

      if (!clerkId || !email) {
        console.error('Webhook Error: Missing clerkId or email for user event');
        return new Response('Error occured -- missing required data', { status: 400 });
      }

      try {
        await prisma.user.upsert({
          where: { clerkId: clerkId },
          update: {
            email: email,
            firstName: firstName,
            lastName: lastName,
            profileImageUrl: imageUrl,
          },
          create: {
            clerkId: clerkId,
            email: email,
            firstName: firstName,
            lastName: lastName,
            profileImageUrl: imageUrl,
            // Default plan and credits are set by Prisma schema defaults
          },
        });
        console.log(`Successfully upserted user: ${clerkId}`);
      } catch (dbError) {
        console.error('Database error handling user event:', dbError);
        return new Response('Error occured -- database operation failed', { status: 500 });
      }
      break;

    case 'user.deleted':
      const deletedClerkId = eventData.id;

      if (!deletedClerkId) {
        console.error('Webhook Error: Missing clerkId for user.deleted event');
        return new Response('Error occured -- missing required data', { status: 400 });
      }

      try {
        // Use deleteMany to avoid errors if user doesn't exist (idempotency)
        await prisma.user.deleteMany({
          where: { clerkId: deletedClerkId },
        });
        console.log(`Successfully processed deletion for user: ${deletedClerkId}`);
      } catch (dbError) {
        console.error('Database error handling user.deleted event:', dbError);
        // Acknowledge deletion even if local db operation fails
        return new Response('Acknowledged, but DB operation failed', { status: 200 });
      }
      break;

    // Add handlers for other events if needed (e.g., organization events, session events)
    // case 'organization.created':
    //   // Handle organization creation
    //   break;

    default:
      console.log(`Unhandled webhook event type: ${eventType}`);
  }

  return new Response('', { status: 200 })
} 