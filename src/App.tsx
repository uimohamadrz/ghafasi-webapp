import { useEffect, useState } from 'react';
import { BottomNav, type ViewName } from './components/BottomNav';
import { ArchiveScreen } from './screens/ArchiveScreen';
import { BirthdayScreen } from './screens/BirthdayScreen';
import { GeneratorScreen } from './screens/GeneratorScreen';
import { HomeScreen } from './screens/HomeScreen';
import { loadFriends, saveFriends } from './lib/storage';
import type { Friend } from './lib/types';
import styles from './App.module.css';

function App() {
  const [view, setView] = useState<ViewName>('home');
  const [friends, setFriends] = useState<Friend[]>(() => loadFriends());
  const [generatorText, setGeneratorText] = useState('تولدِ سارا');
  const [gifId, setGifId] = useState('1');

  useEffect(() => {
    saveFriends(friends);
  }, [friends]);

  function addFriend(name: string, jm: number, jd: number) {
    setFriends((prev) => [...prev, { id: `${Date.now()}`, name, jm, jd }]);
  }

  function deleteFriend(id: string) {
    setFriends((prev) => prev.filter((f) => f.id !== id));
  }

  function makeCardForFriend(text: string) {
    setGeneratorText(text);
    setView('make');
  }

  return (
    <div className={styles.shell}>
      {view === 'home' && <HomeScreen />}
      {view === 'make' && (
        <GeneratorScreen
          text={generatorText}
          onTextChange={setGeneratorText}
          gifId={gifId}
          onSelectGif={setGifId}
        />
      )}
      {view === 'cake' && (
        <BirthdayScreen
          friends={friends}
          onAddFriend={addFriend}
          onDeleteFriend={deleteFriend}
          onMakeCardForFriend={makeCardForFriend}
        />
      )}
      {view === 'archive' && <ArchiveScreen />}
      <BottomNav active={view} onNavigate={setView} />
    </div>
  );
}

export default App;
