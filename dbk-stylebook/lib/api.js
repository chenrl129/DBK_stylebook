import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://szyikrtmguxdgbvxnwti.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6eWlrcnRtZ3V4ZGdidnhud3RpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcxODMzNDQsImV4cCI6MjAxMjc1OTM0NH0.PMin082RaisejGryOctiUVVIkXlfXYJw3szz_RN_las'
)