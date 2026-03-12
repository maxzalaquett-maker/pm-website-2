# PM Website 2

Minimal personal portfolio website built with Next.js App Router, TypeScript, and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

## Deploy

This project is ready for deployment on Vercel as a standard Next.js application.

## Content updates

- Edit case studies in `lib/case-studies.ts`
- Edit product principles in `lib/principles.ts`
- Replace `public/resume.pdf` with the actual resume file

## Optional work page protection

Set `WORK_PAGE_PASSWORD` to lightly protect `/work` and `/work/[slug]`.

```bash
WORK_PAGE_PASSWORD=your-password
```

If `WORK_PAGE_PASSWORD` is not set, the work section stays public.
