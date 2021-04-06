export default interface ICardProps {
  icon: JSX.Element;
  onCardClick: () => void;
  onEditIconClick?: () => void;
  onDeleteIconClick?: () => void;
  tournamentId?: number;
  name: string;
  color: string;
  isInteractive: boolean;
  date?: string;
}
