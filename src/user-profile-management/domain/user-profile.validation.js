export function validatePatientProfile(profile) {
  const errors = {};

  if (!profile.first_name?.trim()) errors.first_name = 'required';
  if (!profile.last_name?.trim()) errors.last_name = 'required';
  if (!Number.isFinite(Number(profile.age)) || Number(profile.age) <= 0) errors.age = 'positive';
  if (!profile.gender?.trim()) errors.gender = 'required';
  if (!Number.isFinite(Number(profile.weight)) || Number(profile.weight) <= 0) errors.weight = 'positive';
  if (!Number.isFinite(Number(profile.height)) || Number(profile.height) <= 0) errors.height = 'positive';

  return errors;
}

export function validateGoal(goal) {
  const errors = {};

  if (!goal.type?.trim()) errors.type = 'required';
  if (!Number.isFinite(Number(goal.target_weight)) || Number(goal.target_weight) <= 0) errors.target_weight = 'positive';
  if (!goal.target_date) errors.target_date = 'required';
  if (!goal.status?.trim()) errors.status = 'required';

  return errors;
}

export function validatePreference(preference) {
  const errors = {};
  if (!preference.dietary_preferences?.trim() && !preference.favorite_foods?.trim()) errors.content = 'required';
  return errors;
}

export function validateRestriction(restriction) {
  const errors = {};
  if (!restriction.type?.trim()) errors.type = 'required';
  if (!restriction.description?.trim()) errors.description = 'required';
  return errors;
}

export function validateNutritionistProfile(profile) {
  const errors = {};
  if (!profile.specialty?.trim()) errors.specialty = 'required';
  if (!Number.isInteger(Number(profile.experience_years)) || Number(profile.experience_years) < 0) {
    errors.experience_years = 'nonNegativeInteger';
  }
  return errors;
}
