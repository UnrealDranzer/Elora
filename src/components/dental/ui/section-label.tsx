type SectionLabelProps = {
  index: string;
  title: string;
};

export const SectionLabel = ({ index, title }: SectionLabelProps) => (
  <p className="text-[0.68rem] font-medium uppercase tracking-[0.32em] text-muted-foreground">
    {index} — {title}
  </p>
);
