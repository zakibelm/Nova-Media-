
import React, { useState } from 'react';
import { CampaignIntakeForm } from '../types';
import { Send, Sparkles, X, Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface CampaignInitiatorProps {
  onSubmit: (data: CampaignIntakeForm) => void;
  onCancel: () => void;
}

const CampaignInitiator: React.FC<CampaignInitiatorProps> = ({ onSubmit, onCancel }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<CampaignIntakeForm>({
    nom_campagne: '',
    description_produit_service: '',
    objectif_marketing: '',
    marche_cible: '',
    budget: '',
    date_debut: '',
    date_fin: '',
    urls_reference: '',
    ton_et_style_souhaite: '',
    // concurrents_principaux removed as requested
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-nova-800 border border-nova-700 rounded-xl shadow-2xl relative animate-in fade-in zoom-in-95 duration-300">
      <div className="absolute top-4 right-4">
        <button onClick={onCancel} className="text-gray-500 hover:text-white transition-colors">
          <X size={24} />
        </button>
      </div>

      <div className="mb-8 border-b border-nova-700 pb-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Sparkles className="text-nova-cyan" /> 
          {t.campaign.title}
        </h2>
        <p className="text-gray-400 mt-1">
          {t.campaign.subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            {t.campaign.name}
          </label>
          <input
            type="text"
            name="nom_campagne"
            value={formData.nom_campagne}
            onChange={handleChange}
            className="w-full bg-nova-900 border border-nova-700 rounded px-4 py-3 text-white focus:border-nova-cyan focus:outline-none transition-colors"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            {t.campaign.desc}
          </label>
          <textarea
            name="description_produit_service"
            value={formData.description_produit_service}
            onChange={handleChange}
            rows={3}
            className="w-full bg-nova-900 border border-nova-700 rounded px-4 py-3 text-white focus:border-nova-cyan focus:outline-none transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            {t.campaign.obj}
          </label>
          <input
            type="text"
            name="objectif_marketing"
            value={formData.objectif_marketing}
            onChange={handleChange}
            className="w-full bg-nova-900 border border-nova-700 rounded px-4 py-3 text-white focus:border-nova-cyan focus:outline-none transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            {t.campaign.target}
          </label>
          <input
            type="text"
            name="marche_cible"
            value={formData.marche_cible}
            onChange={handleChange}
            className="w-full bg-nova-900 border border-nova-700 rounded px-4 py-3 text-white focus:border-nova-cyan focus:outline-none transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            {t.campaign.budget}
          </label>
          <input
            type="text"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full bg-nova-900 border border-nova-700 rounded px-4 py-3 text-white focus:border-nova-cyan focus:outline-none transition-colors"
            required
          />
        </div>

        {/* Date Range Selection */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Calendar size={12} /> {t.campaign.startDate}
            </label>
            <input
              type="date"
              name="date_debut"
              value={formData.date_debut}
              onChange={handleChange}
              className="w-full bg-nova-900 border border-nova-700 rounded px-4 py-3 text-white focus:border-nova-cyan focus:outline-none transition-colors [color-scheme:dark]"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Calendar size={12} /> {t.campaign.endDate}
            </label>
            <input
              type="date"
              name="date_fin"
              value={formData.date_fin}
              onChange={handleChange}
              className="w-full bg-nova-900 border border-nova-700 rounded px-4 py-3 text-white focus:border-nova-cyan focus:outline-none transition-colors [color-scheme:dark]"
              required
            />
          </div>
        </div>

        <div className="md:col-span-2">
           <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            {t.campaign.ref}
          </label>
           <input
            type="text"
            name="urls_reference"
            value={formData.urls_reference}
            onChange={handleChange}
            className="w-full bg-nova-900 border border-nova-700 rounded px-4 py-3 text-white focus:border-nova-cyan focus:outline-none transition-colors"
            placeholder="https://..."
          />
        </div>

        <div className="md:col-span-2">
           <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            {t.campaign.tone}
          </label>
           <input
            type="text"
            name="ton_et_style_souhaite"
            value={formData.ton_et_style_souhaite}
            onChange={handleChange}
            className="w-full bg-nova-900 border border-nova-700 rounded px-4 py-3 text-white focus:border-nova-cyan focus:outline-none transition-colors"
          />
        </div>

        <div className="md:col-span-2 flex justify-end gap-3 mt-4 border-t border-nova-700 pt-6">
          <button 
            type="button" 
            onClick={onCancel}
            className="px-6 py-3 rounded-lg border border-nova-700 text-gray-400 hover:text-white hover:bg-nova-800 transition-colors"
          >
            {t.campaign.cancel}
          </button>
          <button 
            type="submit"
            className="px-6 py-3 rounded-lg bg-nova-cyan text-nova-900 font-bold hover:bg-cyan-400 transition-colors shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center gap-2"
          >
            <Send size={18} /> {t.campaign.submit}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CampaignInitiator;
