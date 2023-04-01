export function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}
export const activityLevelText = {
    0: "Sedentary (little or no exercise)",
    1: "Lightly active (exercise 1–3 days/week)",
    2: "Moderately active (exercise 3–5 days/week)",
    3: "Active (exercise 6–7 days/week)",
    4: "Very active (hard exercise 6–7 days/week)"
};