import React, { useState } from 'react';
import { CampaignIntakeForm } from '../types';
import { Send, Sparkles, X } from 'lucide-react';

interface CampaignInitiatorProps {
  onSubmit: (data: CampaignIntakeForm) => void;
  onCancel: () => void;
}

const CampaignInitiator: React.FC<CampaignInitiatorProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<CampaignIntakeForm>({
    nom_campagne: '',
    description_produit_service: '',
    objectif_marketing: '',
    marche_cible: '',
    budget: '',
    deadline: '',
    concurrents_principaux: '',
    urls_reference: '',
    ton_et_style_souhaite: ''
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
          Initialize New Campaign (Module 0)
        </h2>
        <p className="text-gray-400 mt-1">
          Complete the intake form to trigger the Campaign Initiator → Client Success Manager handoff.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            Campaign Name
          </label>
          <input
            type="text"
            name="nom_campagne"
            value={formData.nom_campagne}
            onChange={handleChange}
            required
            className="w-full bg-nova-900 border border-nova-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-nova-cyan transition-colors"
            placeholder="e.g. Q4 Product Launch Alpha"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            Product / Service Description
          </label>
          <textarea
            name="description_produit_service"
            value={formData.description_produit_service}
            onChange={handleChange}
            required
            rows={3}
            className="w-full bg-nova-900 border border-nova-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-nova-cyan transition-colors"
            placeholder="Describe what we are promoting..."
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            Marketing Objective
          </label>
          <input
            type="text"
            name="objectif_marketing"
            value={formData.objectif_marketing}
            onChange={handleChange}
            required
            className="w-full bg-nova-900 border border-nova-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-nova-cyan transition-colors"
            placeholder="e.g. Brand Awareness, Lead Gen"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            Target Market
          </label>
          <input
            type="text"
            name="marche_cible"
            value={formData.marche_cible}
            onChange={handleChange}
            required
            className="w-full bg-nova-900 border border-nova-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-nova-cyan transition-colors"
            placeholder="e.g. Gen Z in Europe"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            Budget
          </label>
          <input
            type="text"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full bg-nova-900 border border-nova-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-nova-cyan transition-colors"
            placeholder="e.g. $50,000"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            Deadline
          </label>
          <input
            type="text"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full bg-nova-900 border border-nova-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-nova-cyan transition-colors"
            placeholder="e.g. Dec 31, 2024"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            Main Competitors
          </label>
          <input
            type="text"
            name="concurrents_principaux"
            value={formData.concurrents_principaux}
            onChange={handleChange}
            className="w-full bg-nova-900 border border-nova-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-nova-cyan transition-colors"
            placeholder="List main competitors..."
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            Reference URLs
          </label>
          <input
            type="text"
            name="urls_reference"
            value={formData.urls_reference}
            onChange={handleChange}
            className="w-full bg-nova-900 border border-nova-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-nova-cyan transition-colors"
            placeholder="e.g. www.website.com, social links"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            Desired Tone & Style
          </label>
          <input
            type="text"
            name="ton_et_style_souhaite"
            value={formData.ton_et_style_souhaite}
            onChange={handleChange}
            className="w-full bg-nova-900 border border-nova-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-nova-cyan transition-colors"
            placeholder="e.g. Professional, Witty, Minimalist"
          />
        </div>

        <div className="md:col-span-2 flex justify-end gap-4 mt-6 border-t border-nova-700 pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-lg text-gray-400 hover:text-white font-medium hover:bg-nova-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-3 rounded-lg bg-nova-cyan hover:bg-cyan-600 text-nova-900 font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:scale-105"
          >
            <Send size={18} />
            Initialize Pipeline
          </button>
        </div>
      </form>
    </div>
  );
};

export default CampaignInitiator;