import React from 'react';

export const SubmitButton = (props) => {
  const disabledLabel = props.disabledLabel || 'submitting...';
  const enabledLabel = props.enabledLabel || 'submit';

  let btn = props.isSubmitting ? (
    <button disabled className='btn btn-info'>
      {disabledLabel}
    </button>
  ) : (
    <button
      type='submit'
      disabled={props.isDisabled}
      className='btn btn-primary'
    >
      {enabledLabel}
    </button>
  );
  return btn;
};
