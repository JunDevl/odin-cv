import { useState } from 'react';
import MainForm from './ui/components/mainForm/MainForm'
import Curriculum from './ui/components/finishedCurriculum/Curriculum';

import type { CurriculumForm, Tab } from './ui/types';

function App() {
  const [form, setForm] = useState<CurriculumForm>({} as CurriculumForm);
  const [tab, setTab] = useState<Tab>("form");

  return (
    <>
      {tab === "form" ?
        <MainForm formState={[form, setForm]} setTab={setTab}/> :
        <Curriculum filledForm={form} setTab={setTab}/>
      }
    </>
  )
}

export default App
