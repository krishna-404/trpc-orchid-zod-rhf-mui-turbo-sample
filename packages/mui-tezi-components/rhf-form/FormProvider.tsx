// form
import { FieldValues, FormProvider as Form, UseFormReturn, useFormContext } from 'react-hook-form';
import { Divider, Stack } from '@mui/material';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

type Props<T extends FieldValues> = {
  borderStyle?: 'dashed' | 'none';
  children: React.ReactNode;
  methods: UseFormReturn<T>;
  onSubmit?: VoidFunction;
};

export function FormProvider<T extends FieldValues>({ borderStyle = 'none', children, onSubmit, methods }: Props<T>) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>
        <Stack
          divider = {<Divider flexItem sx={{ borderStyle: borderStyle  }} />}
          spacing={3}
        >
          {children}
        </Stack>
      </form>
    </Form>
  );
}