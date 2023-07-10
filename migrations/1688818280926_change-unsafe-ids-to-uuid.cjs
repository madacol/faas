exports.up = pgm => {
    pgm.sql`
        ALTER TABLE public.pal_requests ALTER COLUMN pal_request_id DROP DEFAULT,
        ALTER COLUMN pal_request_id TYPE uuid USING (gen_random_uuid()),
        ALTER COLUMN pal_request_id SET DEFAULT gen_random_uuid();
    `
};