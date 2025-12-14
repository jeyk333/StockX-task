import React, { useState } from 'react';
import { FileText, AlertCircle } from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';
import toast from 'react-hot-toast';

const CreateProposal: React.FC = () => {
  const { isConnected } = useWallet();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [action, setAction] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!title || !description) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.success('Proposal created successfully!');
    // Reset form
    setTitle('');
    setDescription('');
    setAction('');
  };

  return (
    <div className="card max-w-3xl">
      <div className="flex items-center space-x-2 mb-6">
        <FileText className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Create New Proposal
        </h2>
      </div>

      {!isConnected && (
        <div className="mb-6 p-4 bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-800 rounded-lg flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-warning-600 dark:text-warning-400 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-warning-800 dark:text-warning-300">
              Wallet Not Connected
            </p>
            <p className="text-xs text-warning-600 dark:text-warning-400 mt-1">
              Please connect your wallet to create a proposal. You need to hold governance tokens to submit proposals.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Proposal Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Increase Transaction Fee to 0.15%"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description *
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide a detailed description of your proposal..."
            rows={6}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Proposed Action
          </label>
          <input
            type="text"
            value={action}
            onChange={(e) => setAction(e.target.value)}
            placeholder="e.g., Update fee parameter to 0.0015"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Optional: Specify the exact on-chain action this proposal will execute
          </p>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="submit"
            disabled={!isConnected}
            className="w-full btn-primary disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Submit Proposal
          </button>
          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">
            Submitting a proposal requires governance tokens and may incur gas fees.
          </p>
        </div>
      </form>
    </div>
  );
};

export default CreateProposal;
