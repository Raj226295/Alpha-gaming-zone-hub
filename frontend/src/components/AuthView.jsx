function AuthView({
  mode,
  loginForm,
  signupForm,
  onLoginField,
  onSignupField,
  onSubmitLogin,
  onSubmitSignup,
  onNavigate,
}) {
  const isLogin = mode === 'login'
  const switchCopy = isLogin ? "Don't have an account?" : 'Already have an account?'
  const switchActionLabel = isLogin ? 'Sign up' : 'Login'
  const submitHandler = isLogin ? onSubmitLogin : onSubmitSignup

  return (
    <div className="view-stack">
      <section className="auth-layout">
        <article className="glass-panel auth-form-panel">
          <div className="section-heading">
            <span className="section-eyebrow">{isLogin ? 'Welcome back' : 'Create account'}</span>
            <h2>{isLogin ? 'Player login' : 'Sign up details'}</h2>
            <p>
              {isLogin
                ? 'Enter your email or mobile number and continue with your password.'
                : 'Fill in your player information to create your account.'}
            </p>
          </div>

          <form
            className="auth-form"
            onSubmit={(event) => {
              event.preventDefault()
              submitHandler()
            }}
          >
            {isLogin ? (
              <>
                <div className="form-block">
                  <label className="form-label" htmlFor="loginIdentity">
                    Email / Mobile Number
                  </label>
                  <input
                    id="loginIdentity"
                    className="form-input"
                    type="text"
                    placeholder="Enter email or mobile number"
                    autoComplete="username"
                    value={loginForm.identity}
                    onChange={(event) => onLoginField('identity', event.target.value)}
                  />
                </div>

                <div className="form-block">
                  <label className="form-label" htmlFor="loginPassword">
                    Password
                  </label>
                  <input
                    id="loginPassword"
                    className="form-input"
                    type="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    value={loginForm.password}
                    onChange={(event) => onLoginField('password', event.target.value)}
                  />
                </div>

                <div className="auth-form-meta">
                  <label className="auth-checkbox" htmlFor="rememberMe">
                    <input
                      id="rememberMe"
                      type="checkbox"
                      checked={loginForm.rememberMe}
                      onChange={(event) => onLoginField('rememberMe', event.target.checked)}
                    />
                    <span>Remember me</span>
                  </label>

                  <button type="button" className="text-button auth-inline-link">
                    Forgot Password?
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="form-block">
                  <label className="form-label" htmlFor="signupName">
                    Full Name
                  </label>
                  <input
                    id="signupName"
                    className="form-input"
                    type="text"
                    placeholder="Enter your full name"
                    autoComplete="name"
                    value={signupForm.fullName}
                    onChange={(event) => onSignupField('fullName', event.target.value)}
                  />
                </div>

                <div className="form-block">
                  <label className="form-label" htmlFor="signupUsername">
                    Username / Gamer Tag
                  </label>
                  <input
                    id="signupUsername"
                    className="form-input"
                    type="text"
                    placeholder="Choose a username or gamer tag"
                    autoComplete="nickname"
                    value={signupForm.username}
                    onChange={(event) => onSignupField('username', event.target.value)}
                  />
                </div>

                <div className="form-block inline-two auth-inline-grid">
                  <div>
                    <label className="form-label" htmlFor="signupEmail">
                      Email
                    </label>
                    <input
                      id="signupEmail"
                      className="form-input"
                      type="email"
                      placeholder="Enter your email"
                      autoComplete="email"
                      value={signupForm.email}
                      onChange={(event) => onSignupField('email', event.target.value)}
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="signupPhone">
                      Mobile Number
                    </label>
                    <input
                      id="signupPhone"
                      className="form-input"
                      type="tel"
                      placeholder="Enter your mobile number"
                      autoComplete="tel"
                      value={signupForm.phone}
                      onChange={(event) => onSignupField('phone', event.target.value)}
                    />
                  </div>
                </div>

                <div className="form-block inline-two auth-inline-grid">
                  <div>
                    <label className="form-label" htmlFor="signupPassword">
                      Password
                    </label>
                    <input
                      id="signupPassword"
                      className="form-input"
                      type="password"
                      placeholder="Create a password"
                      autoComplete="new-password"
                      value={signupForm.password}
                      onChange={(event) => onSignupField('password', event.target.value)}
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="signupConfirmPassword">
                      Confirm Password
                    </label>
                    <input
                      id="signupConfirmPassword"
                      className="form-input"
                      type="password"
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                      value={signupForm.confirmPassword}
                      onChange={(event) => onSignupField('confirmPassword', event.target.value)}
                    />
                  </div>
                </div>

                <div className="form-block inline-two auth-inline-grid">
                  <div>
                    <label className="form-label" htmlFor="signupBirthDate">
                      Age / Date of Birth
                    </label>
                    <input
                      id="signupBirthDate"
                      className="form-input"
                      type="text"
                      placeholder="18 or DD/MM/YYYY"
                      value={signupForm.birthDate}
                      onChange={(event) => onSignupField('birthDate', event.target.value)}
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="signupCity">
                      City
                    </label>
                    <input
                      id="signupCity"
                      className="form-input"
                      type="text"
                      placeholder="Enter your city"
                      autoComplete="address-level2"
                      value={signupForm.city}
                      onChange={(event) => onSignupField('city', event.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            <button type="submit" className="primary-button full-width">
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>

          <p className="auth-switch-copy">
            {switchCopy}
            <button
              type="button"
              className="text-button auth-inline-link"
              onClick={() => onNavigate(isLogin ? 'signup' : 'login')}
            >
              {switchActionLabel}
            </button>
          </p>
        </article>
      </section>
    </div>
  )
}

export default AuthView
