'use client';

import { useAuthContext } from '@/context/useAuthContext';
import { Locale } from '@/i18n-config';
import { User } from '@/interface/types';
import { authApiService } from '@/service/api/auth.api';
import { Badge, Cancel, Delete, Edit, Email, Logout, Person, Save, Security } from '@mui/icons-material';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Skeleton,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

interface UserProfileProps {
  onLogout?: () => void;
  dict: any;
  lang: Locale;
}

const ProfileSkeleton = () => (
  <Card>
    <CardContent>
      <Box className="flex flex-col items-center mb-6">
        <Skeleton variant="circular" width={100} height={100} className="mb-4" />
        <Skeleton variant="text" width={200} height={32} className="mb-2" />
        <Skeleton variant="text" width={150} height={20} />
      </Box>
      <Divider className="my-4" />
      <Box className="space-y-4">
        {[1, 2, 3, 4].map((item) => (
          <Box key={item} className="flex justify-between">
            <Skeleton variant="text" width={100} height={20} />
            <Skeleton variant="text" width={150} height={20} />
          </Box>
        ))}
      </Box>
    </CardContent>
  </Card>
);

export default function UserProfile({ onLogout, dict, lang }: UserProfileProps) {
  const { user, logout, loading: authLoading } = useAuthContext();
  const [userDetail, setUserDetail] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [editData, setEditData] = useState({
    username: '',
    fullname: '',
    email: '',
  });

  // Fetch user profile details
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const profile = await authApiService.getUserCurrentProfile();
      setUserDetail(profile);
      setEditData({
        username: profile.username || '',
        fullname: profile.fullname || '',
        email: profile.email || '',
      });
    } catch (err: any) {
      setError(err.message || 'Failed to fetch user profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchUserProfile();
    }
  }, [user?.id]);

  const handleEdit = () => {
    setEditing(true);
    setError(null);
    setSuccess(null);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setEditData({
      username: userDetail?.username || '',
      fullname: userDetail?.fullname || '',
      email: userDetail?.email || '',
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!userDetail?.id) return;

      await authApiService.updateUser(userDetail.id, editData);
      setSuccess('Profile updated successfully!');
      setEditing(false);
      await fetchUserProfile();
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      if (!userDetail?.id) return;

      await authApiService.deleteUser(userDetail.id);
      logout();
      onLogout?.();
    } catch (err: any) {
      setError(err.message || 'Failed to delete account');
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    onLogout?.();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (authLoading || (loading && !userDetail)) {
    return <ProfileSkeleton />;
  }

  if (!user || !userDetail) {
    return (
      <Card>
        <CardContent>
          <Alert severity="error">Failed to load user profile. Please try again.</Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Box className="space-y-6 py-4">
      {/* Main Profile Card */}
      <Card className="relative overflow-hidden">
        {/* Background gradient */}
        <Box className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10" />

        <CardContent className="relative">
          {/* Header with avatar and basic info */}
          <Box className="flex flex-col items-center mb-6">
            <Avatar className="w-24 h-24 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-2xl font-bold">
              {getInitials(userDetail.fullname || userDetail.username)}
            </Avatar>

            {editing ? (
              <Box className="space-y-2 w-full max-w-md">
                <TextField
                  fullWidth
                  label="Full Name"
                  value={editData.fullname}
                  onChange={(e) => setEditData((prev) => ({ ...prev, fullname: e.target.value }))}
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Username"
                  value={editData.username}
                  onChange={(e) => setEditData((prev) => ({ ...prev, username: e.target.value }))}
                  size="small"
                />
              </Box>
            ) : (
              <>
                <Typography variant="h5" className="font-bold text-gray-800 mb-1">
                  {userDetail.fullname || 'No name provided'}
                </Typography>
                <Typography variant="body1" className="text-gray-600 mb-2">
                  @{userDetail.username}
                </Typography>
              </>
            )}

            <Box className="flex gap-2 mt-2">
              <Chip
                label={userDetail.is_active ? 'Active' : 'Inactive'}
                color={userDetail.is_active ? 'success' : 'error'}
                size="small"
              />
              {userDetail.is_valid && <Chip label="Verified" color="primary" size="small" icon={<Security />} />}
            </Box>
          </Box>

          <Divider className="my-4" />

          {/* Profile Details */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box className="space-y-4">
                <Box className="flex items-center gap-3">
                  <Email className="text-gray-500" />
                  <Box className="flex-1">
                    <Typography variant="body2" className="text-gray-500 mb-1">
                      Email Address
                    </Typography>
                    {editing ? (
                      <TextField
                        fullWidth
                        value={editData.email}
                        onChange={(e) => setEditData((prev) => ({ ...prev, email: e.target.value }))}
                        size="small"
                        type="email"
                      />
                    ) : (
                      <Typography variant="body1" className="font-medium">
                        {userDetail.email}
                      </Typography>
                    )}
                  </Box>
                </Box>

                <Box className="flex items-center gap-3">
                  <Badge className="text-gray-500" />
                  <Box>
                    <Typography variant="body2" className="text-gray-500 mb-1">
                      User ID
                    </Typography>
                    <Typography variant="body1" className="font-medium font-mono text-sm">
                      {userDetail.id}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box className="space-y-4">
                <Box className="flex items-center gap-3">
                  <Person className="text-gray-500" />
                  <Box>
                    <Typography variant="body2" className="text-gray-500 mb-1">
                      Created Date
                    </Typography>
                    <Typography variant="body1" className="font-medium">
                      {userDetail.created_at ? new Date(userDetail.created_at).toLocaleDateString() : 'Unknown'}
                    </Typography>
                  </Box>
                </Box>

                <Box className="flex items-center gap-3">
                  <Person className="text-gray-500" />
                  <Box>
                    <Typography variant="body2" className="text-gray-500 mb-1">
                      Last Updated
                    </Typography>
                    <Typography variant="body1" className="font-medium">
                      {userDetail.updated_at ? new Date(userDetail.updated_at).toLocaleDateString() : 'Never'}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* Action Buttons */}
          <Box className="flex justify-between items-center mt-6">
            {editing ? (
              <Box className="flex gap-2">
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button variant="outlined" startIcon={<Cancel />} onClick={handleCancelEdit} disabled={loading}>
                  Cancel
                </Button>
              </Box>
            ) : (
              <Button variant="outlined" startIcon={<Edit />} onClick={handleEdit} disabled={loading}>
                Edit Profile
              </Button>
            )}

            <Box className="flex gap-2">
              <Button variant="outlined" startIcon={<Logout />} onClick={handleLogout} color="primary">
                Logout
              </Button>
              <Button variant="outlined" startIcon={<Delete />} onClick={() => setDeleteDialogOpen(true)} color="error">
                Delete Account
              </Button>
            </Box>
          </Box>

          {/* Success/Error Messages */}
          {success && (
            <Alert severity="success" className="mt-4">
              {success}
            </Alert>
          )}
          {error && (
            <Alert severity="error" className="mt-4">
              {error}
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle className="text-red-600">Delete Account</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete your account? This action cannot be undone. All your data including accounts
            and transactions will be permanently removed.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteAccount} color="error" variant="contained" disabled={loading}>
            {loading ? 'Deleting...' : 'Delete Account'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
