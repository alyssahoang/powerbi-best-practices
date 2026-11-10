// Generates the illustrative channel x region monthly sales used in the spaghetti-chart post.
// Same formula as the GIF mockups, so the Power BI file and the post show identical lines.
const fs = require('fs');
const out = process.argv[2];
const spec = {
  'Online|North': [34, 0.6, 3, 1], 'Online|South': [19, 0.5, 2.5, 2], 'Online|East': [23, 0.4, 3, 3],
  'Online|West': [42, 1.1, 3.5, 4], 'Online|Central': [28, 0.5, 3, 5], "Online|Int'l": [10, 1.0, 2, 6],
  'In-store|North': [33, -0.9, 2.5, 7], 'In-store|South': [32, 0.2, 3, 8], 'In-store|East': [28, -0.1, 2.5, 9],
  'In-store|West': [31, -1.0, 3, 10], 'In-store|Central': [40, 0.2, 3, 11], "In-store|Int'l": [5, 0, 1, 12],
  'Wholesale|North': [12, 0, 2, 13], 'Wholesale|South': [9, 0.1, 2, 14], 'Wholesale|East': [14, -0.2, 2, 15],
  'Wholesale|West': [8, 0.1, 1.5, 16], 'Wholesale|Central': [11, 0.1, 2, 17], "Wholesale|Int'l": [6, 0.2, 1.5, 18]
};
const rows = ['Month,Channel,Region,Sales'];
for (let i = 0; i < 12; i++) {
  const month = '2025-' + String(i + 1).padStart(2, '0') + '-01';
  for (const key of Object.keys(spec)) {
    const [base, slope, amp, phase] = spec[key];
    const k = base + slope * i + amp * Math.sin(i * 1.7 + phase) + 0.6 * amp * Math.sin(i * 3.1 + phase * 2);
    const [channel, region] = key.split('|');
    rows.push([month, channel, region, Math.round(k * 100) * 10].join(','));
  }
}
fs.writeFileSync(out, rows.join('\n') + '\n');
console.log('rows', rows.length - 1);
