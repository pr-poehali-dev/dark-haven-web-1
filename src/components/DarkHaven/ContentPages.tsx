import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface ContentPagesProps {
  activeTab: string;
  wikiSections: Array<{ id: number; title: string; icon: string; description: string }>;
  rules: Array<{ id: number; title: string; text: string }>;
  newsItems: Array<{ id: number; title: string; date: string; content: string; tag: string }>;
  serverStatus: { online: boolean; players: number; maxPlayers: number } | null;
  isAuthenticated: boolean;
  user: { username: string; isAdmin: boolean } | null;
  onShowAuthDialog: () => void;
}

export default function ContentPages({
  activeTab,
  wikiSections,
  rules,
  newsItems,
  serverStatus,
  isAuthenticated,
  user,
  onShowAuthDialog
}: ContentPagesProps) {
  return (
    <>
      {activeTab === 'вики' && (
        <section className="container px-4 py-16">
          <h2 className="mb-8 text-4xl font-bold text-center">Энциклопедия Dark Haven</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {wikiSections.map((section) => (
              <Card key={section.id} className="cyber-border bg-card/50 backdrop-blur hover-scale transition-all cursor-pointer">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <Icon name={section.icon} className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{section.title}</CardTitle>
                      <CardDescription className="mt-2">{section.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'правила' && (
        <section className="container px-4 py-16">
          <h2 className="mb-8 text-4xl font-bold text-center">Правила сервера</h2>
          <div className="mx-auto max-w-3xl space-y-4">
            {rules.map((rule, index) => (
              <Card key={rule.id} className="cyber-border bg-card/50 backdrop-blur animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Badge className="h-8 w-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground">
                      {index + 1}
                    </Badge>
                    {rule.title}
                  </CardTitle>
                  <CardDescription className="mt-2 text-base">{rule.text}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'новости' && (
        <section className="container px-4 py-16">
          <h2 className="mb-8 text-4xl font-bold text-center">Новости разработки</h2>
          <div className="mx-auto max-w-4xl space-y-6">
            {newsItems.map((news) => (
              <Card key={news.id} className="cyber-border bg-card/50 backdrop-blur animate-fade-in">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-primary/20 text-primary">{news.tag}</Badge>
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Calendar" className="h-4 w-4" />
                      {news.date}
                    </span>
                  </div>
                  <CardTitle className="mt-4">{news.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{news.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'мониторинг' && (
        <section className="container px-4 py-16">
          <h2 className="mb-8 text-4xl font-bold text-center">Мониторинг сервера</h2>
          <div className="mx-auto max-w-4xl space-y-6">
            <Card className="cyber-border bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Статус сервера</span>
                  {serverStatus?.online ? (
                    <Badge className="bg-green-500/20 text-green-400 border-green-500">
                      <div className="mr-2 h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                      Онлайн
                    </Badge>
                  ) : (
                    <Badge className="bg-red-500/20 text-red-400 border-red-500">
                      <div className="mr-2 h-2 w-2 rounded-full bg-red-400" />
                      Оффлайн
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">IP Адрес:</span>
                  <code className="text-primary">95.31.51.216:1212</code>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Игроков онлайн:</span>
                  <span className="text-2xl font-bold text-primary">{serverStatus?.players || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Максимум игроков:</span>
                  <span className="font-semibold">{serverStatus?.maxPlayers || 128}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="cyber-border bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>График онлайна</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-around gap-2">
                  {[25, 38, 42, 35, 48, 40, 42, 38, 45, 42, 40, 42].map((value, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 flex-1">
                      <div 
                        className="w-full bg-gradient-to-t from-primary to-secondary rounded-t transition-all hover:opacity-80"
                        style={{ height: `${(value / 50) * 100}%` }}
                      />
                      <span className="text-xs text-muted-foreground">{i * 2}:00</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {activeTab === 'развитие' && (
        <section className="container px-4 py-16">
          <h2 className="mb-8 text-4xl font-bold text-center">Развитие проекта</h2>
          <div className="mx-auto max-w-4xl">
            <Card className="cyber-border bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>Концепция Dark Haven</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Создать симуляцию жизни в космосе в секторе за пределами одной или нескольких станций, 
                  которая полностью раскрывает игровой процесс, позволяя взаимодействовать с окружающим миром.
                </p>
                <h4 className="text-lg font-semibold text-foreground mt-6">Ключевые особенности:</h4>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Масштабность и массовость с продолжительными сессиями</li>
                  <li>Смена экипажей в рамках одной сессии без перезапуска</li>
                  <li>Проработанная экономика с высокими ценами на шаттлы</li>
                  <li>Возможность открытия собственных станций</li>
                  <li>Войны, налёты на сектора и военные операции</li>
                  <li>Разнообразные типы станций: гарнизон, космопорт, тюрьма, электростанция</li>
                  <li>Возвращение антагонистов: воры, агенты синдиката, ниндзя</li>
                  <li>Сохранение шаттлов и станций игроков</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {activeTab === 'видео' && (
        <section className="container px-4 py-16">
          <h2 className="mb-8 text-4xl font-bold text-center">Видео с проекта</h2>
          <div className="mx-auto max-w-4xl">
            <Card className="cyber-border bg-card/50 backdrop-blur">
              <CardContent className="p-6 text-center">
                <Icon name="Video" className="mx-auto mb-4 h-16 w-16 text-primary" />
                <p className="text-muted-foreground mb-4">
                  Видео из TikTok и Telegram канала будут загружаться здесь
                </p>
                <div className="flex gap-4 justify-center">
                  <Button variant="outline" className="border-primary text-primary" asChild>
                    <a href="https://www.tiktok.com/@gameserverx" target="_blank" rel="noopener noreferrer">
                      <Icon name="Instagram" className="mr-2 h-4 w-4" />
                      TikTok @gameserverx
                    </a>
                  </Button>
                  <Button variant="outline" className="border-secondary text-secondary" asChild>
                    <a href="https://t.me/DarkHavenSS14" target="_blank" rel="noopener noreferrer">
                      <Icon name="MessageCircle" className="mr-2 h-4 w-4" />
                      Telegram канал
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {activeTab === 'чат' && (
        <section className="container px-4 py-16">
          <h2 className="mb-8 text-4xl font-bold text-center">Общий чат</h2>
          <div className="mx-auto max-w-4xl">
            {isAuthenticated ? (
              <Card className="cyber-border bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle>Чат сообщества</CardTitle>
                  <CardDescription>Общайтесь с другими игроками</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="h-96 overflow-y-auto border border-border rounded-lg p-4 bg-background/30">
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <Badge className="bg-primary/20 text-primary">Admin</Badge>
                          <div>
                            <p className="text-sm">Добро пожаловать в чат Dark Haven!</p>
                            <span className="text-xs text-muted-foreground">10:30</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Badge className="bg-secondary/20 text-secondary">{user?.username}</Badge>
                          <div>
                            <p className="text-sm">Привет всем!</p>
                            <span className="text-xs text-muted-foreground">10:32</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Введите сообщение..."
                        className="flex-1 h-10 px-3 rounded-md border border-input bg-background"
                      />
                      <Button className="bg-primary hover:bg-primary/90">
                        <Icon name="Send" className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="cyber-border bg-card/50 backdrop-blur">
                <CardContent className="p-6 text-center">
                  <Icon name="MessageSquare" className="mx-auto mb-4 h-16 w-16 text-primary" />
                  <p className="text-muted-foreground mb-4">
                    Публичный чат доступен после авторизации
                  </p>
                  <Button className="bg-primary hover:bg-primary/90" onClick={onShowAuthDialog}>
                    <Icon name="LogIn" className="mr-2 h-4 w-4" />
                    Войти для доступа к чату
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      )}

      {activeTab === 'контакты' && (
        <section className="container px-4 py-16">
          <h2 className="mb-8 text-4xl font-bold text-center">Контакты</h2>
          <div className="mx-auto max-w-4xl grid gap-6 md:grid-cols-2">
            <Card className="cyber-border bg-card/50 backdrop-blur hover-scale transition-all">
              <CardHeader>
                <Icon name="MessageCircle" className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Telegram канал</CardTitle>
                <CardDescription>Новости и обновления проекта</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full border-primary text-primary" asChild>
                  <a href="https://t.me/DarkHavenSS14" target="_blank" rel="noopener noreferrer">
                    Подписаться
                  </a>
                </Button>
              </CardContent>
            </Card>
            <Card className="cyber-border bg-card/50 backdrop-blur hover-scale transition-all">
              <CardHeader>
                <Icon name="Instagram" className="mb-2 h-10 w-10 text-secondary" />
                <CardTitle>TikTok</CardTitle>
                <CardDescription>Видео с игрового процесса</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full border-secondary text-secondary" asChild>
                  <a href="https://www.tiktok.com/@gameserverx" target="_blank" rel="noopener noreferrer">
                    Смотреть видео
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      )}
    </>
  );
}
