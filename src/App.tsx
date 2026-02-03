import { useEffect, useState } from 'react';
import MainForm from './ui/components/mainForm/MainForm'

import type { CurriculumForm } from './ui/types';

type Tab = "form" | "curriculum_preview"

function App() {
  const [form, setForm] = useState<CurriculumForm | null>(null);
  const [tab, setTab] = useState<Tab>("form");

  useEffect(() => console.log(form), [form]);

  return (
    <>
      {tab === "form" ?
        <MainForm formState={[form, setForm]}/> :
        null
      }
    </>
  )
}

export default App
