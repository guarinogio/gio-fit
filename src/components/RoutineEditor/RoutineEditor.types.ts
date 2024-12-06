export interface RoutineEditorProps {
  onAccept: (value: string) => void; // Callback for accepting the routine
  onCancel: () => void;             // Callback for canceling the routine
  placeholder?: string;             // Optional placeholder for the textarea
}
