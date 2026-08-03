import { createFileRoute } from '@tanstack/react-router';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SignInForm } from '@/features/auth/components/sign-in-form';
import { SignUpForm } from '@/features/auth/components/sign-up-form';

export const Route = createFileRoute('/(auth)/sign-up')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="container mx-auto flex flex-col gap-6 px-8 py-16">
      <Tabs defaultValue="sign-up">
        <TabsList variant="line">
          <TabsTrigger value="sign-up">Create account</TabsTrigger>
          <TabsTrigger value="sign-in">Sign in</TabsTrigger>
        </TabsList>
        <TabsContent
          value="sign-up"
          className="pt-10"
        >
          <SignUpForm />
        </TabsContent>
        <TabsContent
          value="sign-in"
          className="pt-10"
        >
          <SignInForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
