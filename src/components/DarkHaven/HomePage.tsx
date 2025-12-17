import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface HomePageProps {
  serverStatus: { online: boolean; players: number; maxPlayers: number } | null;
  newsItems: Array<{ id: number; title: string; date: string; content: string; tag: string }>;
}

export default function HomePage({ serverStatus, newsItems }: HomePageProps) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-primary/20">
        <div className="absolute inset-0 grid-background opacity-30" />
        <div className="scan-line absolute inset-0" />
        <div className="container relative px-4 py-24 text-center">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary">
            <Icon name="Zap" className="mr-1 h-3 w-3" />
            Онлайн: {serverStatus?.players || 0} игроков
          </Badge>
          <h2 className="mb-6 text-5xl md:text-7xl font-black text-primary text-shadow-glow animate-fade-in">
            DARK HAVEN
          </h2>
          <p className="mb-4 text-xl md:text-2xl text-secondary font-semibold">
            Space Station 14
          </p>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
            Симуляция жизни в космосе за пределами станций. MMO с масштабными сессиями, 
            проработанной экономикой, войнами и неограниченными возможностями.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Icon name="Play" className="mr-2 h-5 w-5" />
              Начать играть
            </Button>
            <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
              <Icon name="BookOpen" className="mr-2 h-5 w-5" />
              Узнать больше
            </Button>
          </div>
        </div>
      </section>

      <section className="container px-4 py-16">
        <h3 className="mb-8 text-center text-3xl font-bold">Особенности проекта</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="cyber-border bg-card/50 backdrop-blur hover-scale transition-all">
            <CardHeader>
              <Icon name="Globe" className="mb-2 h-10 w-10 text-primary" />
              <CardTitle>Масштабность</CardTitle>
              <CardDescription>
                Десятки смен без перезапуска сервера
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="cyber-border bg-card/50 backdrop-blur hover-scale transition-all">
            <CardHeader>
              <Icon name="DollarSign" className="mb-2 h-10 w-10 text-secondary" />
              <CardTitle>Экономика</CardTitle>
              <CardDescription>
                Проработанная система торговли и производства
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="cyber-border bg-card/50 backdrop-blur hover-scale transition-all">
            <CardHeader>
              <Icon name="Swords" className="mb-2 h-10 w-10 text-accent" />
              <CardTitle>Войны и рейды</CardTitle>
              <CardDescription>
                Налёты на сектора и военные операции
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="cyber-border bg-card/50 backdrop-blur hover-scale transition-all">
            <CardHeader>
              <Icon name="Save" className="mb-2 h-10 w-10 text-primary" />
              <CardTitle>Сохранения</CardTitle>
              <CardDescription>
                Сохранение шаттлов и станций игроков
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="cyber-border bg-card/50 backdrop-blur hover-scale transition-all">
            <CardHeader>
              <Icon name="Users" className="mb-2 h-10 w-10 text-secondary" />
              <CardTitle>Новые роли</CardTitle>
              <CardDescription>
                Множество новых профессий и возможностей
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="cyber-border bg-card/50 backdrop-blur hover-scale transition-all">
            <CardHeader>
              <Icon name="Skull" className="mb-2 h-10 w-10 text-accent" />
              <CardTitle>Антагонисты</CardTitle>
              <CardDescription>
                Воры, ниндзя, синдикат и ядерные оперативники
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <section className="border-y border-primary/20 bg-card/30 backdrop-blur">
        <div className="container px-4 py-16">
          <h3 className="mb-8 text-center text-3xl font-bold">Характеристики сервера</h3>
          <div className="mx-auto max-w-3xl">
            <Card className="cyber-border bg-card/80">
              <CardContent className="p-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center">
                    <Icon name="Cpu" className="mx-auto mb-2 h-12 w-12 text-primary" />
                    <p className="text-sm text-muted-foreground">Процессор</p>
                    <p className="font-bold">AMD Ryzen 9 9950X</p>
                    <p className="text-sm text-primary">5.7 ГГц</p>
                  </div>
                  <div className="text-center">
                    <Icon name="HardDrive" className="mx-auto mb-2 h-12 w-12 text-secondary" />
                    <p className="text-sm text-muted-foreground">ОЗУ</p>
                    <p className="font-bold">64 ГБ</p>
                  </div>
                  <div className="text-center">
                    <Icon name="Wifi" className="mx-auto mb-2 h-12 w-12 text-accent" />
                    <p className="text-sm text-muted-foreground">Интернет</p>
                    <p className="font-bold">600 Мбит/с</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="container px-4 py-16">
        <h3 className="mb-8 text-center text-3xl font-bold">Последние новости</h3>
        <div className="grid gap-6 md:grid-cols-3">
          {newsItems.slice(0, 3).map((news) => (
            <Card key={news.id} className="cyber-border bg-card/50 backdrop-blur hover-scale transition-all">
              <CardHeader>
                <Badge className="mb-2 w-fit bg-primary/20 text-primary">{news.tag}</Badge>
                <CardTitle className="text-lg">{news.title}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Icon name="Calendar" className="h-4 w-4" />
                  {news.date}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{news.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
