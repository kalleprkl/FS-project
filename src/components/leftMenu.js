import React from 'react'
import { connect } from 'react-redux'
import { endSession } from '../actions/sessionActions'
import { Menu } from 'semantic-ui-react'

const LeftMenu = ({ session, endSession }) => {
    if (session) {
        return (
            <Menu vertical fluid >
                {session.apis.map(api => {
                    if (api.authUrl) {
                        return (
                            <Menu.Item>
                                <a href={api.authUrl}>
                                    <div>
                                        {api.api}
                                    </div>
                                </a>
                            </Menu.Item>
                        )
                    } else {
                        return (
                            <Menu.Item onClick={() => {endSession(api.api, session.token)}}>{`${api.api} logout`}</Menu.Item>
                        )
                    }
                })}
            </Menu>
        )
    }
    return <Menu></Menu>
}

const mapStateToProps = (state) => {
    return {
        session: state.session
    }
}

const mapActionToProps = {
    endSession
  }

export default connect(mapStateToProps, mapActionToProps)(LeftMenu)