import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface AdminPanelProps {
  open: boolean;
  onClose: () => void;
  onAddNews: (news: { title: string; content: string; tag: string; date: string }) => void;
  onAddRule: (rule: { title: string; text: string }) => void;
}

export default function AdminPanel({ open, onClose, onAddNews, onAddRule }: AdminPanelProps) {
  const [newsForm, setNewsForm] = useState({ title: '', content: '', tag: 'Важное' });
  const [ruleForm, setRuleForm] = useState({ title: '', text: '' });

  if (!open) return null;

  const handleAddNews = () => {
    if (!newsForm.title || !newsForm.content) return;
    
    const date = new Date().toLocaleDateString('ru-RU', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
    
    onAddNews({ ...newsForm, date });
    setNewsForm({ title: '', content: '', tag: 'Важное' });
  };

  const handleAddRule = () => {
    if (!ruleForm.title || !ruleForm.text) return;
    
    onAddRule(ruleForm);
    setRuleForm({ title: '', text: '' });
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur overflow-auto">
      <div className="container px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary text-shadow-glow">
              Панель администратора
            </h1>
            <p className="text-muted-foreground mt-2">Управление контентом сайта</p>
          </div>
          <Button onClick={onClose} variant="outline" className="border-muted">
            <Icon name="X" className="mr-2 h-4 w-4" />
            Закрыть
          </Button>
        </div>

        <Tabs defaultValue="news" className="space-y-6">
          <TabsList>
            <TabsTrigger value="news">
              <Icon name="Newspaper" className="mr-2 h-4 w-4" />
              Новости
            </TabsTrigger>
            <TabsTrigger value="rules">
              <Icon name="Scale" className="mr-2 h-4 w-4" />
              Правила
            </TabsTrigger>
            <TabsTrigger value="wiki">
              <Icon name="BookOpen" className="mr-2 h-4 w-4" />
              Вики
            </TabsTrigger>
            <TabsTrigger value="server">
              <Icon name="Server" className="mr-2 h-4 w-4" />
              Сервер
            </TabsTrigger>
          </TabsList>

          {/* News Management */}
          <TabsContent value="news">
            <Card className="cyber-border bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>Добавить новость</CardTitle>
                <CardDescription>Создайте новую запись в разделе новостей</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="news-title">Заголовок</Label>
                  <Input
                    id="news-title"
                    value={newsForm.title}
                    onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                    placeholder="Название новости"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="news-content">Содержание</Label>
                  <Textarea
                    id="news-content"
                    value={newsForm.content}
                    onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                    placeholder="Текст новости"
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="news-tag">Тег</Label>
                  <select
                    id="news-tag"
                    value={newsForm.tag}
                    onChange={(e) => setNewsForm({ ...newsForm, tag: e.target.value })}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  >
                    <option value="Важное">Важное</option>
                    <option value="Разработка">Разработка</option>
                    <option value="Контент">Контент</option>
                    <option value="Обновление">Обновление</option>
                  </select>
                </div>
                <Button onClick={handleAddNews} className="w-full bg-primary hover:bg-primary/90">
                  <Icon name="Plus" className="mr-2 h-4 w-4" />
                  Добавить новость
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rules Management */}
          <TabsContent value="rules">
            <Card className="cyber-border bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>Добавить правило</CardTitle>
                <CardDescription>Создайте новое правило сервера</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="rule-title">Название правила</Label>
                  <Input
                    id="rule-title"
                    value={ruleForm.title}
                    onChange={(e) => setRuleForm({ ...ruleForm, title: e.target.value })}
                    placeholder="Краткое название"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rule-text">Описание</Label>
                  <Textarea
                    id="rule-text"
                    value={ruleForm.text}
                    onChange={(e) => setRuleForm({ ...ruleForm, text: e.target.value })}
                    placeholder="Полное описание правила"
                    rows={4}
                  />
                </div>
                <Button onClick={handleAddRule} className="w-full bg-secondary hover:bg-secondary/90">
                  <Icon name="Plus" className="mr-2 h-4 w-4" />
                  Добавить правило
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wiki Management */}
          <TabsContent value="wiki">
            <Card className="cyber-border bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>Управление вики</CardTitle>
                <CardDescription>Редактирование статей энциклопедии</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Icon name="BookOpen" className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
                  <p className="text-muted-foreground">Функция в разработке</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Server Management */}
          <TabsContent value="server">
            <Card className="cyber-border bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>Управление сервером</CardTitle>
                <CardDescription>Настройки и мониторинг игрового сервера</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="bg-card/30">
                    <CardHeader>
                      <CardTitle className="text-base">Статус сервера</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500">
                        <div className="mr-2 h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                        Онлайн
                      </Badge>
                    </CardContent>
                  </Card>
                  <Card className="bg-card/30">
                    <CardHeader>
                      <CardTitle className="text-base">IP Адрес</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <code className="text-primary">95.31.51.216:1212</code>
                    </CardContent>
                  </Card>
                </div>
                <div className="space-y-2">
                  <Label>Действия</Label>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Icon name="RotateCw" className="mr-2 h-4 w-4" />
                      Перезагрузка
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Icon name="Download" className="mr-2 h-4 w-4" />
                      Логи
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
