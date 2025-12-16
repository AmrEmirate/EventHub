"use client";

import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, Edit, Users, Trash2, MoreHorizontal } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Event } from "@/lib/apihelper";

interface EventsTabProps {
  events: Event[];
  onDeleteClick: (eventId: string) => void;
}

export function EventsTab({ events, onDeleteClick }: EventsTabProps) {
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Event Saya</CardTitle>
        <CardDescription>
          Lihat dan kelola semua event yang telah Anda buat.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Event</TableHead>
              <TableHead>Tanggal Mulai</TableHead>
              <TableHead>Tiket Terjual</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.length > 0 ? (
              events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.name}</TableCell>
                  <TableCell>{formatDate(event.startDate)}</TableCell>
                  <TableCell>
                    {event.ticketSold} / {event.ticketTotal}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => router.push(`/events/${event.slug}`)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Lihat Event
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(`/organizer/edit-event/${event.id}`)
                          }
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(`/organizer/attendees/${event.id}`)
                          }
                        >
                          <Users className="mr-2 h-4 w-4" />
                          Lihat Peserta
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => onDeleteClick(event.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Anda belum membuat event.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
