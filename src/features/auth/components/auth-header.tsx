interface AuthHeaderProps {
  heading: string;
  description: string;
}

export function AuthHeader({ heading, description }: AuthHeaderProps) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl">{heading}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
