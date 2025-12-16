"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Review } from "@/lib/apihelper";

interface ReviewCardProps {
  review: Review;
  apiBaseUrl: string | undefined;
}

export function ReviewCard({ review, apiBaseUrl }: ReviewCardProps) {
  return (
    <div className="flex items-start gap-4 border-b pb-4 last:border-b-0 last:pb-0">
      <Avatar>
        <AvatarImage
          src={
            review.user.profile?.avatarUrl
              ? `${apiBaseUrl}${review.user.profile.avatarUrl}`
              : undefined
          }
        />
        <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="w-full">
        <p className="font-semibold">{review.user.name}</p>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < review.rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        {review.imageUrl && (
          <div className="mt-3 relative w-full md:w-1/2 h-48 rounded-lg overflow-hidden">
            <Image
              src={`${apiBaseUrl}${review.imageUrl}`}
              alt={`Ulasan dari ${review.user.name}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 500px"
            />
          </div>
        )}

        <p className="text-sm text-muted-foreground mt-2">{review.comment}</p>
      </div>
    </div>
  );
}
