import Logo from '@/components/logo';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-gradient-to-b from-background to-muted/50">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <Logo className="text-4xl" />
          <p className="text-muted-foreground">Продвинутый менеджер задач с AI-ассистентом</p>
        </div>
      </div>
    </main>
  );
}
