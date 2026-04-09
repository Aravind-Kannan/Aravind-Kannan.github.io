import React from "react";

export function Github(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17a5.2 5.2 0 0 0-1.5-3.8c.16-.4.65-2-.15-4.5 0 0-1.2-.38-3.9 1.4a13.38 13.38 0 0 0-7 0c-2.7-1.78-3.9-1.4-3.9-1.4-.8 2.5-.3 4.1-.15 4.5a5.2 5.2 0 0 0-1.5 3.8c0 5.75 3.35 6.77 6.5 7.15a4.8 4.8 0 0 0-1 3.05V22" />
      <path d="M9 20c-5 1.5-5-2.5-7-3" />
    </svg>
  );
}

export function Linkedin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
