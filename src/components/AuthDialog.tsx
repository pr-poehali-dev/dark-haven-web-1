import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogin: (username: string, isAdmin: boolean) => void;
}

export default function AuthDialog({ open, onOpenChange, onLogin }: AuthDialogProps) {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!loginData.username || !loginData.password) {
      setError('Заполните все поля');
      return;
    }

    const isAdmin = loginData.username === 'admin' && loginData.password === 'admin123';
    
    onLogin(loginData.username, isAdmin);
    onOpenChange(false);
    setLoginData({ username: '', password: '' });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!registerData.username || !registerData.email || !registerData.password || !registerData.confirmPassword) {
      setError('Заполните все поля');
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    if (registerData.password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }

    onLogin(registerData.username, false);
    onOpenChange(false);
    setRegisterData({ username: '', email: '', password: '', confirmPassword: '' });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md cyber-border bg-card/95 backdrop-blur">
        <DialogHeader>
          <DialogTitle className="text-2xl text-primary text-shadow-glow">
            Авторизация
          </DialogTitle>
          <DialogDescription>
            Войдите или создайте аккаунт для доступа ко всем функциям
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-username">Имя пользователя</Label>
                <Input
                  id="login-username"
                  value={loginData.username}
                  onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                  placeholder="Введите имя пользователя"
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Пароль</Label>
                <Input
                  id="login-password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  placeholder="Введите пароль"
                  className="bg-background/50"
                />
              </div>
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                <Icon name="LogIn" className="mr-2 h-4 w-4" />
                Войти
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Для админа: admin / admin123
              </p>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-username">Имя пользователя</Label>
                <Input
                  id="register-username"
                  value={registerData.username}
                  onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                  placeholder="Придумайте имя"
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Пароль</Label>
                <Input
                  id="register-password"
                  type="password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  placeholder="Минимум 6 символов"
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-confirm">Подтвердите пароль</Label>
                <Input
                  id="register-confirm"
                  type="password"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                  placeholder="Повторите пароль"
                  className="bg-background/50"
                />
              </div>
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
              <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90">
                <Icon name="UserPlus" className="mr-2 h-4 w-4" />
                Создать аккаунт
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
