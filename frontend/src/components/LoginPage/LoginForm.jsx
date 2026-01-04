import { Link } from 'react-router-dom';
export default function LoginForm({
  formdata,
  handleOnChange,
  handleOnSubmit,
  postResponse,
  btnText,
}) {
  return (
    <div className="login-container">
      <form onSubmit={handleOnSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            value={formdata.username}
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor={'password'}>Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formdata.password}
            onChange={handleOnChange}
            required
          />
        </div>
        <br />
        <button type="submit">{btnText}</button>
        <br />
        {postResponse && (
          <div className="response">
            <p>{postResponse ? postResponse : ' '}</p>
          </div>
        )}
      </form>
    </div>
  );
}
