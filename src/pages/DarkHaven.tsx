import { useState, useEffect } from 'react';
import WireCaptcha from '@/components/WireCaptcha';
import AuthDialog from '@/components/AuthDialog';
import AdminPanel from '@/components/AdminPanel';
import Header from '@/components/DarkHaven/Header';
import HomePage from '@/components/DarkHaven/HomePage';
import ContentPages from '@/components/DarkHaven/ContentPages';
import Footer from '@/components/DarkHaven/Footer';

function DarkHaven() {
  const [activeTab, setActiveTab] = useState('главная');
  const [serverStatus, setServerStatus] = useState<{ online: boolean; players: number; maxPlayers: number } | null>(null);
  const [showCaptcha, setShowCaptcha] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [user, setUser] = useState<{ username: string; isAdmin: boolean } | null>(null);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  const [newsItems, setNewsItems] = useState([
    {
      id: 1,
      title: 'Запуск нового сервера Dark Haven',
      date: '15 декабря 2024',
      content: 'Мы рады объявить о запуске нашего нового сервера с улучшенными характеристиками и увеличенным онлайном.',
      tag: 'Важное'
    },
    {
      id: 2,
      title: 'Обновление экономической системы',
      date: '10 декабря 2024',
      content: 'Проработанная экономика: цены на шаттлы значительно повышены, добавлена возможность открытия собственных станций.',
      tag: 'Разработка'
    },
    {
      id: 3,
      title: 'Новые антагонисты и роли',
      date: '5 декабря 2024',
      content: 'Возвращение классических антагонистов: воры, агенты синдиката, ядерные оперативники, ниндзя и многое другое!',
      tag: 'Контент'
    }
  ]);

  useEffect(() => {
    const captchaPassed = localStorage.getItem('captchaPassed');
    if (captchaPassed === 'true') {
      setShowCaptcha(false);
    }
  }, []);

  useEffect(() => {
    const fetchServerStatus = async () => {
      try {
        const response = await fetch('https://functions.poehali.dev/3f5f9e2b-943e-4980-ae29-ef7254c8b860');
        const data = await response.json();
        setServerStatus({
          online: data.online,
          players: data.players,
          maxPlayers: data.maxPlayers
        });
      } catch (error) {
        console.error('Failed to fetch server status:', error);
        setServerStatus({ online: false, players: 0, maxPlayers: 128 });
      }
    };

    fetchServerStatus();
    const interval = setInterval(fetchServerStatus, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleCaptchaSuccess = () => {
    localStorage.setItem('captchaPassed', 'true');
    setShowCaptcha(false);
  };

  const handleLogin = (username: string, isAdmin: boolean) => {
    setUser({ username, isAdmin });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setShowAdminPanel(false);
  };

  const handleAddNews = (news: { title: string; content: string; tag: string; date: string }) => {
    const newItem = {
      id: newsItems.length + 1,
      ...news
    };
    setNewsItems([newItem, ...newsItems]);
  };

  const handleAddRule = (rule: { title: string; text: string }) => {
    const newRule = {
      id: rules.length + 1,
      ...rule
    };
    setRules([...rules, newRule]);
  };

  const [rules, setRules] = useState([
    { id: 1, title: 'Уважение к игрокам', text: 'Не оскорбляйте других игроков, не используйте нецензурную лексику.' },
    { id: 2, title: 'Ролевая игра', text: 'Следуйте своей роли, не мешайте другим игрокам играть.' },
    { id: 3, title: 'Метагейминг запрещён', text: 'Не используйте внешнюю информацию в игре.' },
    { id: 4, title: 'Гриферство', text: 'Запрещено намеренное вредительство без ролевых причин.' }
  ]);

  const wikiSections = [
    { id: 1, title: 'Начало игры', icon: 'Rocket', description: 'Первые шаги на станции Dark Haven' },
    { id: 2, title: 'Роли и профессии', icon: 'Users', description: 'Все доступные роли и их обязанности' },
    { id: 3, title: 'Экономика', icon: 'DollarSign', description: 'Система торговли и заработка' },
    { id: 4, title: 'Корабли и станции', icon: 'Cpu', description: 'Информация о шаттлах и станциях' }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAuthenticated={isAuthenticated}
        user={user}
        onShowAdminPanel={() => setShowAdminPanel(true)}
        onLogout={handleLogout}
        onShowAuthDialog={() => setShowAuthDialog(true)}
      />

      {activeTab === 'главная' && (
        <HomePage serverStatus={serverStatus} newsItems={newsItems} />
      )}

      <ContentPages
        activeTab={activeTab}
        wikiSections={wikiSections}
        rules={rules}
        newsItems={newsItems}
        serverStatus={serverStatus}
        isAuthenticated={isAuthenticated}
        user={user}
        onShowAuthDialog={() => setShowAuthDialog(true)}
      />

      <Footer />

      {showCaptcha && <WireCaptcha onSuccess={handleCaptchaSuccess} />}

      <AuthDialog
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        onLogin={handleLogin}
      />

      <AdminPanel
        open={showAdminPanel}
        onClose={() => setShowAdminPanel(false)}
        onAddNews={handleAddNews}
        onAddRule={handleAddRule}
      />
    </div>
  );
}

export default DarkHaven;
