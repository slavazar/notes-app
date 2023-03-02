<?php
 
namespace App\Policies\User;
 
use App\Models\User\Note as UserNote;
use App\Models\User;
 
class NotePolicy
{
    /**
     * Determine if the given post can be updated by the user.
     */
    public function update(User $user, UserNote $note): bool
    {
        return $user->id === $note->user_id;
    }
    
    public function delete(User $user, UserNote $note): bool
    {
        return $user->id === $note->user_id;
    }
}