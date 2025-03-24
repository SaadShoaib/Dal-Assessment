import React, { useEffect, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import axios from 'axios';
import { 
    Box, 
    Button, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    TextField, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem,
    CircularProgress
 } from '@mui/material';
import dayjs from 'dayjs';

export default function TransactionTable() {
  const [transactions, setTransactions] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ type: '', amount: '' });
  const [loading, setLoading] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [loadingTransaction, setLoadingTransaction] = useState(false);
  const [viewId, setViewId] = useState('');
  
  const fetchTransactions = async () => {
    setLoading(true);

    const { data } = await axios.get('http://localhost:4000/api/transactions');
    setTransactions(data);

    setLoading(false);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);

    await axios.post('http://localhost:4000/api/transactions', {
      ...form,
      amount: parseInt(form.amount),
    });
    setOpen(false);
    setForm({ type: '', amount: '' });
    fetchTransactions();

    setLoading(false);
  };

  const handleViewTransaction = async (id) => {
    setViewDialogOpen(true);
    setLoadingTransaction(true);
    try {
      const { data } = await axios.get(`http://localhost:4000/api/transactions/${id}`);
      setTransactionDetails(data);
    } catch (err) {
      setTransactionDetails(null);
    } finally {
      setLoadingTransaction(false);
    }
  };

  const columns = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'type', header: 'Type' },
    { accessorKey: 'amount', header: 'Amount' },
    { accessorKey: 'date', header: 'Date', Cell: ({ cell }) => dayjs(cell.getValue()).format('YYYY-MM-DD') },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
            Add Transaction
        </Button>
        <Button variant="outlined" onClick={fetchTransactions}>
            {loading ? 'Refreshing...' : 'Refresh'}
        </Button>
      </Box>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
        </Box>
        ) : (
            <MaterialReactTable 
                columns={columns} 
                data={transactions}
                enablePagination={false}
                enableSorting={false}
                enableColumnActions={false}
                enableFilters={false}
                enableGlobalFilter={false}
                enableColumnResizing={false}
                enableDensityToggle={false}
                enableFullScreenToggle={false}
                enableHiding={false}
                enableRowSelection={false}
                enableStickyHeader={false}
                enableToolbarInternalActions={false}
                enableRowActions={true}
                renderRowActions={({ row }) => (
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleViewTransaction(row.original.id)}
                    >
                      View
                    </Button>
                )}
            />
        )}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Transaction</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
        <FormControl fullWidth>
            <InputLabel id="type-label">Type</InputLabel>
            <Select
            labelId="type-label"
            value={form.type}
            label="Type"
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
            <MenuItem value="credit">Credit</MenuItem>
            <MenuItem value="debit">Debit</MenuItem>
            </Select>
        </FormControl>
        <TextField
            label="Amount"
            type="number"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

    <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)}>
        <DialogTitle>Transaction Details</DialogTitle>
        <DialogContent sx={{ mt: 1 }}>
            {loadingTransaction ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
            ) : transactionDetails ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <p><strong>ID:</strong> {transactionDetails.id}</p>
                <p><strong>Type:</strong> {transactionDetails.type}</p>
                <p><strong>Amount:</strong> {transactionDetails.amount}</p>
                <p><strong>Date:</strong> {new Date(transactionDetails.date).toLocaleString()}</p>
            </Box>
            ) : (
            <p>No data found.</p>
            )}
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
        </DialogActions>
    </Dialog>
    </Box>
  );
}
