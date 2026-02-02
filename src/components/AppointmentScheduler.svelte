<svelte:options customElement="appointment-scheduler" />

<script>
  // Svelte 5 runes demonstration
  // Props from HubSpot module
  export let title = 'Schedule an Appointment';
  export let description = 'Select your preferred date and time';
  
  // $state - reactive state management (Svelte 5 rune)
  let selectedDate = $state('');
  let selectedTime = $state('');
  let clientName = $state('');
  let clientEmail = $state('');
  let appointmentType = $state('initial');
  let showConfirmation = $state(false);
  
  // $derived - computed values that auto-update (Svelte 5 rune)
  let isFormValid = $derived(
    selectedDate && selectedTime && clientName && clientEmail
  );
  
  let formattedAppointment = $derived(() => {
    if (!selectedDate || !selectedTime) return '';
    const date = new Date(selectedDate);
    return `${date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    })} at ${selectedTime}`;
  });
  
  let appointmentTypeLabel = $derived(() => {
    const types = {
      'initial': 'Initial Consultation (60 min)',
      'followup': 'Follow-up Session (50 min)',
      'evaluation': 'Psychological Evaluation (90 min)'
    };
    return types[appointmentType] || types.initial;
  });
  
  // $effect - side effects that run when dependencies change (Svelte 5 rune)
  $effect(() => {
    // Auto-save to localStorage whenever form data changes
    if (clientName || clientEmail || selectedDate) {
      const formData = {
        clientName,
        clientEmail,
        selectedDate,
        selectedTime,
        appointmentType,
        savedAt: new Date().toISOString()
      };
      localStorage.setItem('appointmentDraft', JSON.stringify(formData));
    }
  });
  
  $effect(() => {
    // Load saved draft on component mount
    const saved = localStorage.getItem('appointmentDraft');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        clientName = data.clientName || '';
        clientEmail = data.clientEmail || '';
        selectedDate = data.selectedDate || '';
        selectedTime = data.selectedTime || '';
        appointmentType = data.appointmentType || 'initial';
      } catch (e) {
        console.log('No saved draft found');
      }
    }
  });
  
  function handleSubmit(e) {
    e.preventDefault();
    if (!isFormValid) return;
    
    // Simulate API call
    console.log('Appointment request:', {
      clientName,
      clientEmail,
      selectedDate,
      selectedTime,
      appointmentType
    });
    
    showConfirmation = true;
    localStorage.removeItem('appointmentDraft');
    
    // Reset after 5 seconds
    setTimeout(() => {
      showConfirmation = false;
      resetForm();
    }, 5000);
  }
  
  function resetForm() {
    selectedDate = '';
    selectedTime = '';
    clientName = '';
    clientEmail = '';
    appointmentType = 'initial';
  }
  
  // Generate available time slots
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];
  
  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];
</script>

<div class="appointment-scheduler">
  {#if showConfirmation}
    <div class="confirmation-message">
      <div class="confirmation-icon">✓</div>
      <h3>Appointment Request Received!</h3>
      <p>Thank you, {clientName}. We'll confirm your appointment for:</p>
      <p class="appointment-details">{formattedAppointment()}</p>
      <p class="confirmation-note">A confirmation email will be sent to {clientEmail}</p>
    </div>
  {:else}
    <div class="scheduler-content">
      <h2>{title}</h2>
      {#if description}
        <p class="description">{description}</p>
      {/if}
      
      <form onsubmit={handleSubmit}>
        <div class="form-group">
          <label for="client-name">Full Name *</label>
          <input 
            id="client-name"
            type="text" 
            bind:value={clientName}
            placeholder="John Doe"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="client-email">Email Address *</label>
          <input 
            id="client-email"
            type="email" 
            bind:value={clientEmail}
            placeholder="john@example.com"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="appointment-type">Appointment Type *</label>
          <select id="appointment-type" bind:value={appointmentType}>
            <option value="initial">Initial Consultation (60 min)</option>
            <option value="followup">Follow-up Session (50 min)</option>
            <option value="evaluation">Psychological Evaluation (90 min)</option>
          </select>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label for="date">Preferred Date *</label>
            <input 
              id="date"
              type="date" 
              bind:value={selectedDate}
              min={today}
              required
            />
          </div>
          
          <div class="form-group">
            <label for="time">Preferred Time *</label>
            <select id="time" bind:value={selectedTime} required>
              <option value="">Select a time</option>
              {#each timeSlots as slot}
                <option value={slot}>{slot}</option>
              {/each}
            </select>
          </div>
        </div>
        
        {#if selectedDate && selectedTime}
          <div class="appointment-preview">
            <strong>Your appointment:</strong>
            <div class="preview-details">
              {formattedAppointment()}
            </div>
            <div class="preview-type">
              {appointmentTypeLabel()}
            </div>
          </div>
        {/if}
        
        <button 
          type="submit" 
          class="submit-btn"
          disabled={!isFormValid}
        >
          Request Appointment
        </button>
      </form>
    </div>
  {/if}
</div>

<style>
  .appointment-scheduler {
    max-width: 600px;
    margin: 0 auto;
    padding: 32px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  .scheduler-content h2 {
    margin: 0 0 8px 0;
    color: #0b6b5a;
    font-size: 24px;
  }
  
  .description {
    margin: 0 0 24px 0;
    color: #6b6b6b;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  
  label {
    display: block;
    margin-bottom: 6px;
    font-weight: 600;
    color: #202020;
    font-size: 14px;
  }
  
  input[type="text"],
  input[type="email"],
  input[type="date"],
  select {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 15px;
    font-family: inherit;
    transition: border-color 0.2s;
  }
  
  input:focus,
  select:focus {
    outline: none;
    border-color: #0b6b5a;
  }
  
  .appointment-preview {
    background: #f7f7f7;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 20px;
    border-left: 4px solid #0b6b5a;
  }
  
  .preview-details {
    font-size: 16px;
    color: #202020;
    margin: 8px 0;
  }
  
  .preview-type {
    color: #6b6b6b;
    font-size: 14px;
  }
  
  .submit-btn {
    width: 100%;
    padding: 14px;
    background: #0b6b5a;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }
  
  .submit-btn:hover:not(:disabled) {
    background: #085d50;
  }
  
  .submit-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  
  .confirmation-message {
    text-align: center;
    padding: 40px 20px;
  }
  
  .confirmation-icon {
    width: 80px;
    height: 80px;
    background: #0b6b5a;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    margin: 0 auto 20px;
  }
  
  .confirmation-message h3 {
    color: #0b6b5a;
    margin: 0 0 16px 0;
  }
  
  .appointment-details {
    font-size: 18px;
    font-weight: 600;
    color: #202020;
    margin: 16px 0;
  }
  
  .confirmation-note {
    color: #6b6b6b;
    font-size: 14px;
  }
  
  @media (max-width: 600px) {
    .appointment-scheduler {
      padding: 20px;
    }
    
    .form-row {
      grid-template-columns: 1fr;
    }
  }
</style>
