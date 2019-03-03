package neone.app.%appName%;

import org.apache.felix.scr.annotations.Component;

import java.util.Optional;

/**
 * Marker class to tell the OSGi framework that the containing bundle is a game plugin.
 *
 */
@Component(componentAbstract = true)
public abstract class GamePlugin<T extends Character> {

}