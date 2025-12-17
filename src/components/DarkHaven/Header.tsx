import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAuthenticated: boolean;
  user: { username: string; isAdmin: boolean } | null;
  onShowAdminPanel: () => void;
  onLogout: () => void;
  onShowAuthDialog: () => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  isAuthenticated,
  user,
  onShowAdminPanel,
  onLogout,
  onShowAuthDialog
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Icon name="Orbit" className="h-8 w-8 text-primary text-shadow-glow" />
          <h1 className="text-xl font-bold text-primary text-shadow-glow">DARK HAVEN</h1>
        </div>
        <nav className="hidden md:flex gap-6">
          {['Главная', 'Вики', 'Правила', 'Новости', 'Мониторинг', 'Развитие', 'Видео', 'Чат', 'Контакты'].map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item.toLowerCase())}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeTab === item.toLowerCase() ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            {user?.isAdmin && (
              <Button
                size="sm"
                variant="outline"
                onClick={onShowAdminPanel}
                className="border-accent text-accent"
              >
                <Icon name="Settings" className="mr-2 h-4 w-4" />
                Админ-панель
              </Button>
            )}
            <div className="flex items-center gap-2">
              <Badge className="bg-primary/20 text-primary">{user?.username}</Badge>
              <Button size="sm" variant="ghost" onClick={onLogout}>
                <Icon name="LogOut" className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <Button size="sm" className="bg-secondary hover:bg-secondary/80" onClick={onShowAuthDialog}>
            <Icon name="LogIn" className="mr-2 h-4 w-4" />
            Войти
          </Button>
        )}
      </div>
    </header>
  );
}
