import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getEventsByUser } from "@/lib/actions/events.actions";
import { getOrdersByUser } from "@/lib/actions/order.actions";
import { IOrder } from "@/lib/database/models/order.models";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

const ProfilePage = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const orders = await getOrdersByUser({ userId, page: 1 });
  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];
  const organizedEvents = await getEventsByUser({ userId, page: 1 });
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-center bg-cover py-5 md:py-10 ">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
          <Button asChild className="button hidden sm:flex">
            <Link href={"/#events"}> Explore more events</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={orderedEvents}
          emptyTitle="No Events Tickets purchased yet"
          emptyStateSubtext="No worries - plenty of exciting event to explore"
          collectionType="My_Tickets"
          limit={3}
          page={1}
          totalPages={2}
          urlParamName="ordersPage"
        />
      </section>

      <section className="bg-primary-50 bg-dotted-pattern bg-center bg-cover py-5 md:py-10 ">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Events Organised</h3>
          <Button asChild className="button hidden sm:flex">
            <Link href={"/events/create"}>Create New Event</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={organizedEvents?.data}
          emptyTitle="No Events have been created yet"
          emptyStateSubtext="Go create some now"
          collectionType="Events_Organized"
          limit={6}
          page={1}
          totalPages={2}
          urlParamName="eventsPage"
        />
      </section>
    </>
  );
};

export default ProfilePage;
