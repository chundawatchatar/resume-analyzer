import type { ReactNode } from "react";

export function H1({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={`scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance ${className ?? ""}`}
    >
      {children}
    </h1>
  );
}

export function H2({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 ${className ?? ""}`}
    >
      {children}
    </h2>
  );
}

export function H3({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className ?? ""}`}
    >
      {children}
    </h3>
  );
}

export function H4({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h4
      className={`scroll-m-20 text-xl font-semibold tracking-tight ${className ?? ""}`}
    >
      {children}
    </h4>
  );
}
