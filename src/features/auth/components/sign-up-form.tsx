import type { InferInput } from 'valibot';

import { useForm } from '@tanstack/react-form';
import { ArrowRightIcon } from 'lucide-react';
import { email, nonEmpty, object, pipe, string, trim } from 'valibot';

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { AuthSocialProviders } from '@/features/auth/components/social-auth';

import { AuthHeader } from './auth-header';

const SignUpFormSchema = object({
  email: pipe(string(), trim(), nonEmpty(), email()),
  firstName: pipe(string(), trim(), nonEmpty()),
  lastName: pipe(string(), trim(), nonEmpty()),
  password: pipe(string(), trim(), nonEmpty()),
});

type SignUpForm = InferInput<typeof SignUpFormSchema>;

const defaultValues: SignUpForm = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
};

export function SignUpForm() {
  const form = useForm({
    defaultValues,
    validators: { onSubmit: SignUpFormSchema },
  });
  return (
    <div className="flex flex-col gap-8">
      <AuthHeader
        heading="Join Forma"
        description="Create an account to save pieces, track orders, and access trade pricing."
      />
      <div className="flex flex-col gap-6">
        <AuthSocialProviders />
        <div className="flex items-center gap-3">
          <Separator className="shrink" />
          <span className="whitespace-nowrap">or continue with e-maiil</span>
          <Separator className="shrink" />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="gap-5">
            <div className="flex items-center gap-4">
              <form.Field name="firstName">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>First Name</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        type="text"
                        placeholder="John"
                        autoComplete="given-name"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
              <form.Field name="lastName">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Last Name</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        type="text"
                        placeholder="Doe"
                        autoComplete="family-name"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </div>
            <form.Field name="email">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>E-mail</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      type="email"
                      placeholder="john.doe@email.com"
                      autoComplete="email"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="password">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      type="password"
                      placeholder="Min. 8 characters"
                      autoComplete="new-password"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <Button type="submit">
              Create Account <ArrowRightIcon data-icon="inline-end" />
            </Button>
          </FieldGroup>
        </form>
      </div>
      <div className="flex items-center justify-center gap-1">
        <span className="text-muted-foreground">Already have an account?</span>
        <span>Sign In</span>
      </div>
    </div>
  );
}
