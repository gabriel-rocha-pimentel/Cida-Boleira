import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '@/services/supabaseClient';

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

const initialSettings = {
  logoUrl: '', 
  siteName: 'Cida Bolos',
  contactEmail: 'email@example.com',
  whatsappNumber: '5500999999999',
  instagramHandle: 'cidabolos',
  city: 'Bonfinópolis de Minas',
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(initialSettings);
  const [loading, setLoading] = useState(true);

  const fetchAndSetSettings = async () => {
    setLoading(true);
    if (!supabase) {
      console.warn("Supabase client not available. Using local/default settings.");
      const localData = localStorage.getItem('siteSettings');
      setSettings(localData ? JSON.parse(localData) : initialSettings);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.from('settings').select('key, value');
      if (error) throw error;

      const fetchedSettings = data.reduce((acc, curr) => {
        acc[curr.key] = curr.value;
        return acc;
      }, {});

      const completeSettings = { ...initialSettings, ...fetchedSettings };
      setSettings(completeSettings);
      localStorage.setItem('siteSettings', JSON.stringify(completeSettings));
    } catch (error) {
      console.error("Failed to load settings from Supabase:", error);
      const localData = localStorage.getItem('siteSettings');
      setSettings(localData ? JSON.parse(localData) : initialSettings);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetSettings();
  }, []);

  const updateSettings = async (newSettings) => {
    setLoading(true);
    if (!supabase) {
      console.warn("Supabase client not available. Updating local settings only.");
      const updatedLocalSettings = { ...settings, ...newSettings };
      localStorage.setItem('siteSettings', JSON.stringify(updatedLocalSettings));
      setSettings(updatedLocalSettings);
      setLoading(false);
      return;
    }

    try {
      const updates = Object.entries(newSettings).map(([key, value]) => 
        supabase.from('settings').upsert({ 
          key: key, 
          value: value.toString(), 
          updated_at: new Date().toISOString() 
        }, { onConflict: 'key' })
      );

      const results = await Promise.all(updates);
      results.forEach(res => { if(res.error) throw res.error; });

      await fetchAndSetSettings();
    } catch (error) {
      console.error("Failed to update settings in Supabase:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, loading, fetchSettings: fetchAndSetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};