import Icon from '@/components/ui/icon';

export default function Footer() {
  return (
    <footer className="border-t border-primary/20 bg-card/30 backdrop-blur">
      <div className="container px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Icon name="Orbit" className="h-8 w-8 text-primary text-shadow-glow" />
            <div>
              <p className="font-bold text-primary">DARK HAVEN</p>
              <p className="text-sm text-muted-foreground">Space Station 14</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 Dark Haven. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
