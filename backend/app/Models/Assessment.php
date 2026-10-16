<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Assessment extends Model
{
    protected $fillable = [
        'nama',
        'whatsapp',
        'jurusan',
        'bahasa',
        'status',
        'sumber',
        'answers',
        'rekomendasi',
    ];

    protected $casts = [
        'answers' => 'array',
        'rekomendasi' => 'array',
    ];

    protected $appends = ['kode'];

    public function getKodeAttribute(): string
    {
        return 'R-'.str_pad((string) $this->id, 3, '0', STR_PAD_LEFT);
    }
}
