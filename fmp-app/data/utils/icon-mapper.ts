import {
  BarChart3,
  Bell,
  Clock,
  Search,
  Settings,
  Shield,
  Users,
  Wrench,
  LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Search,
  Settings,
  BarChart3,
  Bell,
  Users,
  Shield,
  Clock,
  Wrench,
};

export function getIcon(iconName: string): LucideIcon {
  return iconMap[iconName] || Search;
}
