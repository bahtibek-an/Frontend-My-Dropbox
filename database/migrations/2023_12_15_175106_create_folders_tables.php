<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('folders_tables', function (Blueprint $table) {
            $table->id();
            $table->string('folder_name');
            $table->unsignedBigInteger('base_id')->nullable();
            $table->foreign('base_id')->references('id')->on('folders_tables')->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('folders_tables');
    }
};
