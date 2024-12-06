export const validateRoutineSession = (session: string): boolean => {
  // Check if the session is empty
  if (!session.trim()) {
    console.error('Routine is empty.');
    return false;
  }

  // Regular expression to validate exercises
  const exerciseRegex = /^\d+\.\s.+$/;

  // Regular expression to validate allowed set combinations
  const setRegex = /^\[\d+x(\d+[ms]|\d+)\](?:\s@\d+%\s\(\d+(kg|lb)\))?(?:\s\(\d+(kg|lb)\))?(?:\s\|\s\d+[ms])?$/;

  // Regular expression to disallow [NxM] without time or weight
  const invalidBareSetRegex = /^\[\d+x\d+\]$/;

  // Split input into lines and trim spaces
  const lines = session.split('\n').map((line) => line.trim());

  // Track if we are inside an exercise block
  let inExercise = false;
  let hasSetForExercise = false;

  for (const line of lines) {
    if (exerciseRegex.test(line)) {
      // Validate the previous exercise had at least one set
      if (inExercise && !hasSetForExercise) {
        console.error('Exercise has no sets:', line);
        return false;
      }
      // Start a new exercise block
      inExercise = true;
      hasSetForExercise = false; // Reset for the new exercise
    } else if (setRegex.test(line)) {
      // Check if the set is invalid due to missing time or weight
      if (invalidBareSetRegex.test(line)) {
        console.error('Set is missing time or weight:', line);
        return false;
      }
      // A valid set, mark that the exercise has a set
      hasSetForExercise = true;
    } else if (line === '') {
      // Allow optional blank lines
      continue;
    } else {
      // Any other line is invalid
      console.error('Invalid line format:', line);
      return false;
    }
  }

  // Validate the last exercise block had at least one set
  if (inExercise && !hasSetForExercise) {
    console.error('Last exercise has no sets.');
    return false;
  }

  return true;
};
