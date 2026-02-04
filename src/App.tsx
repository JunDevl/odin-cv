import { useEffect, useState } from 'react';
import MainForm from './ui/components/mainForm/MainForm'
import Curriculum from './ui/components/finishedCurriculum/Curriculum';

import type { CurriculumForm, Tab } from './ui/types';

function App() {
  const [form, setForm] = useState<CurriculumForm | null>(null);
  const [tab, setTab] = useState<Tab>("form");

  useEffect(() => console.log(form), [form]);

  return (
    <>
      {tab === "form" ?
        <MainForm formState={[form, setForm]} tabState={[tab, setTab]}/> :
        <Curriculum filledForm={form as CurriculumForm} tabState={[tab, setTab]}/>
      }
    </>
  )
}

export default App
