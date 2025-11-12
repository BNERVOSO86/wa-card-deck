-- Enable Row Level Security on celctrl table
ALTER TABLE celctrl ENABLE ROW LEVEL SECURITY;

-- Create a permissive policy for all operations
CREATE POLICY "Allow all operations on celctrl"
ON celctrl
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- Add msgdia column for daily messages count
ALTER TABLE celctrl ADD COLUMN IF NOT EXISTS msgdia numeric DEFAULT 0;

-- Enable realtime for celctrl table
ALTER TABLE celctrl REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE celctrl;