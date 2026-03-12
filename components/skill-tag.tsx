import { Tag } from "@/components/tag";

type SkillTagProps = {
  label: string;
};

export function SkillTag({ label }: SkillTagProps) {
  return <Tag>{label}</Tag>;
}
