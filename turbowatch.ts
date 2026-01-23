import { defineConfig } from 'turbowatch';

export default defineConfig({
  project: __dirname,
  triggers: [
    {
      expression: ['match', '*.ts', 'basename'],
      name: 'build',
      onChange: async ({ spawn }) => {
        await spawn`tsc`;
      },
    },
  ],
});
