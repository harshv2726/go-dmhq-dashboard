export function PageHeader({
  title,
  description,
  action,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="my-[9px] max-w-[480px] py-[9px]">
        <h1 className="mb-[9px] text-[22px] font-medium">{title}</h1>
        {description && <p className="text-sm leading-5 text-muted-foreground">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
