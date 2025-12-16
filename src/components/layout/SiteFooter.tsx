import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-muted py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">EventHub</h3>
            <p className="text-muted-foreground text-sm">
              Your premier destination for discovering and managing amazing
              events in Indonesia.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">For Attendees</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                <Link href="/">Browse Events</Link>
              </li>
              <li>
                <Link href="/my-tickets">My Tickets</Link>
              </li>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">For Organizers</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                <Link href="/organizer/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link href="/organizer/create-event">Create Event</Link>
              </li>
              <li>
                <Link href="/organizer/analytics">Analytics</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                <Link href="/help">Help Center</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
              <li>
                <Link href="/terms">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-6 md:mt-8 pt-6 md:pt-8 text-center text-muted-foreground text-sm">
          <p>&copy; 2024 EventHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
